import OwnerPagesHeader from "../components/OwnerHeader";
import LiveStock from '../Shop/Stock_Live';

const Stock = () => {
    return (
        <div>

          {/**page head -start */}
          <OwnerPagesHeader pageName="Stock" />
          {/**page head - end */}

          <LiveStock/>

        </div>
    );
};

export default Stock;