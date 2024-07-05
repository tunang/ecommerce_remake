import ProductsPage from "../Products/ProductsPage";


const categories = ['shirts', 'shoes', 'watches'];
const MenPage = () => {
    return ( <div>
        <div className="grid">
            <h2>Men's clothing</h2>
        </div>

        <ProductsPage url={'/category/mens-'} categories={categories}/>
    </div> );
}
 
export default MenPage;