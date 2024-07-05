import ProductsPage from "../Products/ProductsPage";


const categories = ['shirts', 'shoes', 'watches'];

const WomenPage = () => {
    return ( <div>
        <div className="grid">
            <h2>Women's clothing</h2>
        </div>

        <ProductsPage url={'/category/womens-'} categories={categories}/>    
    </div> );
}
 
export default WomenPage;