import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import { createDataFunc, updateDataFunc } from '../redux/dataSlice';
import { modalFunc } from '../redux/modalSlice';
import { useLocation, useNavigate } from 'react-router-dom';



const Product = () => {

    const {modal} = useSelector(state =>state.modal);
    const {data, keyword} = useSelector(state => state.data);
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [productInfo,setProductInfo] = useState({name:"",price:"", url:""})
    const onChangeFunc = (e, type) => {
      if (type === "file") { // Dosya seçimi yapıldığında
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function(event) {
          setProductInfo(prev => ({...prev, url: event.target.result })); // Resmin URL'sini güncelle
        };
    
        reader.readAsDataURL(file);
      } else { // Diğer alanlar için
        setProductInfo(prev => ({...prev, [e.target.name]: e.target.value }));
      }
    }
    
    let loc = location?.search.split('=')[1]
    useEffect(() => {
      if(loc){
        setProductInfo(data.find(dt => dt.id == loc))
      }
    }, [loc])

    
    
    console.log(location?.search.split('=')[1],"location")

    const buttonFunc = () => {
      dispatch(createDataFunc({...productInfo, id:data.length +1}))
      dispatch(modalFunc());
    }
    const buttonUpdateFunc = () => {
      dispatch(updateDataFunc({...productInfo, id:loc}))
      dispatch(modalFunc());
      navigate('/')



    }
  
   
    const contentModal = (
      <> 
            <Input value={productInfo.name} type={"text"} placeholder={"Ürün ekle..."} name={"name"} id={"name"} onChange={e => onChangeFunc(e, "name")}/>
            <Input value={productInfo.price} type={"text"} placeholder={"Fiyat ekle..."} name={"price"} id={"nameprice"} onChange={e => onChangeFunc(e, "price")}/>
            <Input type={"file"} placeholder={"Resim Seç"} name={"url"} id={"url"} onChange={e => onChangeFunc(e, "file")}/>
            <Button btnText={loc ?  "Ürün Güncelle": "Ürün olustur"} onClick={loc ? buttonUpdateFunc : buttonFunc}/>

      </>
    )

    const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword));




  return (
    <div>
      <div className='flex items-center flex-wrap'>
        {
          filteredItems?.map((dt,i)=> (
            <ProductCard key={i} dt={dt}/>
          ))
        }
      </div>

        {modal && <Modal content={contentModal} title={loc ?  "Ürün Güncelle": "Ürün olustur"}/>}
    </div>
  )
}

export default Product