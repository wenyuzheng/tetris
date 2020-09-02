import _ from 'lodash';
import realPieces from "./realPieces";

export default () => {
    return _.cloneDeep(_.sample(realPieces));
}

