import ReactLoading from 'react-loading';

const CircleLoading = () => {
    return ( 
        <div className="flex justify-center items-center h-[400px]"><ReactLoading className="" type={'spin'} color={'#010101'} /></div> 
     );
}
 
export default CircleLoading;