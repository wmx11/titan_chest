import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';
import web3Config from '../config/web3';
import { getProjectById } from '../controllers/project';
import { getAbiById } from '../controllers/abi';
import { ABI, Network, Project } from '@prisma/client';
import { getNetworkById } from '../controllers/network';

type Cache = {
  project: Project | null;
  abi: ABI | null;
  network: Network | null;
};

const cache = {
  titano: {
    project: null,
    abi: null,
    network: null,
  } as Cache,
};

const titanoContract = async (): Promise<{
  contract: Contract;
  contractMethodCall: (method: string, args: string[]) => Promise<string | number>;
}> => {
  if (!cache.titano.project) {
    const project: Project | null = await getProjectById({ type: 'name', value: 'titano' });
    const abi: ABI | null = await getAbiById(project?.abi_id as number);
    const network: Network | null = await getNetworkById(project?.network_id as number);

    cache.titano.project = project;
    cache.titano.abi = abi;
    cache.titano.network = network;
  }

  const {
    titano: { project, abi, network },
  } = cache;

  const web3 = new Web3(network?.rpc_endpoint as string);

  // Init Project contract
  const contract: Contract = new web3.eth.Contract(JSON.parse(abi?.abi as string), project?.address as string);

  const contractMethodCall = (method: string, args: string[]): Promise<string | number> => {
    return contract.methods[method](...args).call({ from: web3Config.caller });
  };

  return { contract, contractMethodCall };
};

export default titanoContract;
