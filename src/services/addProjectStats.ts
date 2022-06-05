/* eslint-disable @typescript-eslint/naming-convention */
import { getAbiById } from '../../src/controllers/abi';
import { getLiquidityPoolByProjectOrTokenId } from '../../src/controllers/liquidity';
import { getNetworkById } from '../../src/controllers/network';
import { getAllProjects } from '../../src/controllers/project';
import { getTokenById } from '../../src/controllers/token';

import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import { toDecimals } from '../../src/utils/helpers';
import { addProjectStats } from '../../src/controllers/stats';
import axios from 'axios';
import { ABI, Liquidity, Network, Project, Stats, Token } from '@prisma/client';
import web3Config from '../config/web3';

const CALLER = web3Config.caller;

const addProjectStatsService = async () => {
  try {
    const projects: Project[] = await getAllProjects();

    projects.forEach(async (project: Project) => {
      if (!project.enabled) {
        return;
      }

      let treasuryBalance = null;
      let rfvBalance = null;
      let burned_tokens = null;
      let holders = null;
      let average_holdings = null;

      const projectNetwork: Network | null = await getNetworkById(project.network_id as number);

      const projectABIResult: ABI | null = await getAbiById(project.abi_id as number);

      const projectLiquidityPool: Liquidity | null = await getLiquidityPoolByProjectOrTokenId({
        type: 'project_id',
        id: project.id,
      });

      // Get RPC endpoint
      const rpc_endpoint = projectNetwork?.rpc_endpoint;

      // Get Project ABI
      const projectABI = projectABIResult?.abi;

      // Get Project LP address
      const projectLP = projectLiquidityPool?.address;

      // Get Project pair token
      // Example -> TITANO/BNB
      const projectPairToken: Token | null = await getTokenById(project.token_id as number);

      const projectPairTokenAbi: ABI | null = await getAbiById(projectPairToken?.abi_id as number);

      // Get Project pair token ABI
      const pairTokenABI = projectPairTokenAbi?.abi;

      // Get Project pair token's pair token
      // Example -> BNB/BUSD
      const projectPairTokenPair: Token | null = await getTokenById(project.token_pair_id as number);

      const projectPairTokenPairAbi: ABI | null = await getAbiById(projectPairTokenPair?.abi_id as number);

      // Get Project pair token's pair token ABI
      const pairTokenPairAbi = projectPairTokenPairAbi?.abi;

      const projectPairLiquidityPool: Liquidity | null = await getLiquidityPoolByProjectOrTokenId({
        type: 'token_id',
        id: project.token_id as number,
      });

      // Get Project pair token's pair LP
      const tokenPairLP = projectPairLiquidityPool?.address;

      // Set Web3 Provider
      const web3 = new Web3(rpc_endpoint as string);

      // Init Project contract (eg. Titano)
      const projectContract: Contract = new web3.eth.Contract(
        JSON.parse(projectABI as string),
        project?.address as string,
      );

      // Init Project pair contract (eg. BNB)
      const projectPairContract: Contract = new web3.eth.Contract(
        JSON.parse(pairTokenABI as string),
        projectPairToken?.address as string,
      );

      // Init Project pair token pair contract (eg. BUSD)
      const projectPairPairContract: Contract = new web3.eth.Contract(
        JSON.parse(pairTokenPairAbi as string),
        projectPairTokenPair?.address as string,
      );

      // Get Project LP tokens amount
      const projectLPTokens = await projectContract.methods.balanceOf(projectLP).call({ from: CALLER });

      const projectPairLPTokens = await projectPairContract.methods.balanceOf(projectLP).call({ from: CALLER });

      // Get Project pair LP tokens amount
      const pairLPTokens = await projectPairContract.methods.balanceOf(tokenPairLP).call({ from: CALLER });

      const pairPairLPTokens = await projectPairPairContract.methods.balanceOf(tokenPairLP).call({ from: CALLER });

      // Get Project total supply
      const projectTotalSupply = await projectContract.methods.totalSupply().call({ from: CALLER });

      const projectDecimals = await projectContract.methods.decimals().call({ from: CALLER });

      const projectPairDecimals = await projectPairContract.methods.decimals().call({ from: CALLER });

      const tokenPairPrice =
        toDecimals(projectPairLPTokens, projectPairDecimals) / toDecimals(projectLPTokens, projectDecimals);

      const pairPrice = toDecimals(pairPairLPTokens) / toDecimals(pairLPTokens);

      const tokenPrice = tokenPairPrice * pairPrice;

      const projectLiquidity = pairPrice * toDecimals(projectPairLPTokens, projectPairDecimals);

      const projectMarketCap = tokenPrice * toDecimals(projectTotalSupply);

      if (project.treasury_address) {
        treasuryBalance = await web3.eth.getBalance(project.treasury_address);
      }

      if (project.rfv_address) {
        rfvBalance = await web3.eth.getBalance(project.rfv_address);
      }

      if (project.holders_endpoint !== null) {
        try {
          const {
            data: { holders: value },
          } = await axios(project.holders_endpoint);
          holders = value;
        } catch (error) {
          console.log(error);
        }
      }

      if (project.average_holdings_endpoint !== null) {
        try {
          const {
            data: { average: value },
          } = await axios(project.average_holdings_endpoint);
          average_holdings = value;
        } catch (error) {
          console.log(error);
        }
      }

      if (project.burn_address) {
        const burnedTokens = await projectContract.methods.balanceOf(project.burn_address).call({ from: CALLER });
        burned_tokens = burnedTokens;
      }

      const data = {
        name: project.name,
        project_id: project.id,
        price: tokenPrice,
        pair_price: pairPrice,
        liquidity: projectLiquidity,
        marketcap: projectMarketCap,
        treasury: toDecimals(treasuryBalance) * pairPrice,
        rfv: toDecimals(rfvBalance) * pairPrice,
        holders,
        average_holdings,
        burned_tokens: toDecimals(burned_tokens, projectDecimals),
      };

      await addProjectStats(data as Stats);
    });
  } catch (error) {
    console.log(error);
  }
};

export default addProjectStatsService;
