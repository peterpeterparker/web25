import { idlFactory } from "./declarations/demoweb25_backend/demoweb25_backend.did.js";
import {Actor, HttpAgent} from "@dfinity/agent";

// Copied from the declaration of a sample project
export const createActor = (canisterId, options = {}) => {
  const agent = options.agent || new HttpAgent({
    // Here we query mainnet / production
    host: "https://icp0.io",
    ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
        "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // The fetch root key is used when developing locally - so here as we query production we do not query it

  // Fetch root key for certificate validation during development
  if (import.meta.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
          "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};

export const sayHello = async () => {
  // The backend canister ID that was deployed on mainnet is jh2ax-oiaaa-aaaap-abf4a-cai

  // 1. create an actor
  // - it uses @dfinity/... library
  // - it instantiates an agent that takes care of the data transfer
  // - it uses the declarations for mapping encoding and decoding
  const actor = createActor("jh2ax-oiaaa-aaaap-abf4a-cai")

  // 2. Use the actor to query the selected end point
  const greeting = await actor.greet("a name");

  console.log(greeting);
}
