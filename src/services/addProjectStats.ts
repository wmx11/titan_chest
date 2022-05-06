/* eslint-disable @typescript-eslint/naming-convention */
import { getAbiById } from '../../src/controllers/abi';
import { getLiquidityPoolByProjectOrTokenId } from '../../src/controllers/liquidity';
import { getNetworkById } from '../../src/controllers/network';
import { getAllProjects } from '../../src/controllers/project';
import { getTokenById } from '../../src/controllers/token';

import Cabin from 'cabin';

import Contract from 'web3-eth-contract';
import Web3 from 'web3';
import { toDecimals } from '../../src/utils/helpers';
import { addProjectStats } from '../../src/controllers/stats';

const CALLER = '0xeef21237ddb484e6813109ef848f2af17a51f8cb';

const addProjectStatsService = async () => {
  const cabin = new Cabin();
  try {
    const projects = await getAllProjects();

    projects.forEach(async (project) => {
      if (!project.enabled) {
        return;
      }
      // Get RPC endpoint
      const { rpc_endpoint } = await getNetworkById(project.network_id);

      // Get Project ABI
      const { abi: projectABI } = await getAbiById(project.abi_id);

      // Get Project LP address
      const { address: projectLP } = await getLiquidityPoolByProjectOrTokenId(project.id);

      // Example -> TITANO/BNB
      // Get Project pair token
      const projectPairToken = await getTokenById(project.token_id);

      // Get Project pair token ABI
      const { abi: pairTokenABI } = await getAbiById(projectPairToken.abi_id);

      // Example -> BNB/BUSD
      // Get Project pair token's pair token
      const projectPairTokenPair = await getTokenById(project.token_pair_id);

      // Get Project pair token's pair token ABI
      const { abi: pairTokenPairAbi } = await getAbiById(projectPairTokenPair.abi_id);

      // Get Project pair token's pair LP
      const { address: tokenPairLP } = await getLiquidityPoolByProjectOrTokenId(project.id, project.token_id);

      // Set the provider
      Contract.setProvider(rpc_endpoint);
      const web3 = new Web3(rpc_endpoint);

      // Init Project contract (eg. Titano)
      const projectContract = new Contract(JSON.parse(projectABI), project.address);

      // Init Project pair contract (eg. BNB)
      const projectPairContract = new Contract(JSON.parse(pairTokenABI), projectPairToken?.address);

      // Init Project pair token pair contract (eg. BUSD)
      const projectPairPairContract = new Contract(JSON.parse(pairTokenPairAbi), projectPairTokenPair?.address);

      // Get Project LP tokens amount
      const projectLPTokens = await projectContract.methods.balanceOf(projectLP).call({ from: CALLER });
      const projectPairLPTokens = await projectPairContract.methods.balanceOf(projectLP).call({ from: CALLER });

      // Get Project pair LP tokens amount
      const pairLPTokens = await projectPairContract.methods.balanceOf(tokenPairLP).call({ from: CALLER });
      const pairPairLPTokens = await projectPairPairContract.methods.balanceOf(tokenPairLP).call({ from: CALLER });

      // Get Project total supply
      const projectTotalSupply = await projectContract.methods.totalSupply().call({ from: CALLER });

      let treasuryBalance = null;
      let rfvBalance = null;

      if (project.treasury_address) {
        treasuryBalance = await web3.eth.getBalance(project.treasury_address);
      }

      if (project.rfv_address) {
        rfvBalance = await web3.eth.getBalance(project.rfv_address);
      }

      const tokenPairPrice = toDecimals(projectPairLPTokens) / toDecimals(projectLPTokens);
      const pairPrice = toDecimals(pairPairLPTokens) / toDecimals(pairLPTokens);
      const tokenPrice = tokenPairPrice * pairPrice;
      const projectLiquidity = pairPrice * toDecimals(projectPairLPTokens);
      const projectMarketCap = tokenPrice * toDecimals(projectTotalSupply);

      const data = {
        name: project.name,
        project_id: project.id,
        price: tokenPrice,
        pair_price: pairPrice,
        liquidity: projectLiquidity,
        marketcap: projectMarketCap,
        treasury: toDecimals(treasuryBalance) * pairPrice,
        rfv: toDecimals(rfvBalance) * pairPrice,
      };

      await addProjectStats(data);
    });
  } catch (error) {
    cabin.error(error);
  }
};

export default addProjectStatsService;
