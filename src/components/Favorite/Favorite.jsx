import FavoriteProductsPage from "../Products/FavoriteProductsPage";
import ProductsPage from "../Products/ProductsPage";
const categories = [''];

const Favorite = () => {
    return ( <div>
        <div className="grid">
            <h2>Favorite</h2>
        </div>

        <FavoriteProductsPage url={'api/favorite'}/>
    </div> );
}
 
export default Favorite;