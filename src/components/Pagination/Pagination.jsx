import { useState } from "react";

const Pagination = ({productPerPage, totalProduct, paginate}) => {
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalProduct/productPerPage); i++){
        pageNumber.push(i);
    }

    const [activePage, setActivePage] = useState(1);

    const handlePageClick = (number) => {
        setActivePage(number);
    }
    
    
    return ( <div className="col-span-full">
            <ul className="flex items-center justify-center mt-4">
                {pageNumber.map((number) => {
                    return <li className={`inline-block w-8 leading-8 text-center border border-tertiary mr-2 ${number === activePage ? 'bg-quinary' : ''}  hover:bg-gray-300 rounded-sm  cursor-pointer`} onClick={()=> {
                                handlePageClick(number); 
                                paginate(number);}} 
                                key={number}>
                        <a>{number}</a>
                    </li>
                })}

            </ul>
    </div> );
}
 
export default Pagination;