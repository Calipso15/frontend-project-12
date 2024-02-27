import Add from './Add';
import Rename from './Rename';
import Remove from './Delete';

const modals = {
  add: Add,
  delete: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
