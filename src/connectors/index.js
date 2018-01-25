import {MONGO_URI} from "../config";
import mongooseConnector from './mongoose-connector';
import server from '../server';


async function initializeConnectors() {
  try {
    mongooseConnector(MONGO_URI);
  } catch(e) {
    server.close();
    console.error(e);
  }
}

export {
  initializeConnectors
}

export default initializeConnectors;