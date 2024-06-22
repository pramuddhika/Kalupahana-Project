import OwnerPagesHeader from "../components/OwnerHeader";
import LiveStock from '../Shop/StockLive';

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