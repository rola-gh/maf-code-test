import './App.css';
import {useEffect, useState} from "react";
import {Col, Pagination, Row} from 'antd';
import {getImageList} from "./API";
import { Input } from 'antd';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
const { Search } = Input;

function App() {
    const [pics, setPics] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    // const [isFav, setIsFav] = useState(false)

    /**Get Item list **/
    useEffect( () => {
         getImageList(perPage, page, searchValue).then(res => {
             const newList = res.photo.map(pic =>
                 ({...pic, isFav: false})
             )
             setPics(newList)
             setTotal(res.pages)
         })

    },[perPage, page, searchValue])

    /**Pagination**/
    const onChangePagination = (pageNumber,pageSize) => {
        setPage(pageNumber)
        setPerPage(pageSize)
    };

    /**Search by item**/
    const onSearch = (value) => {
        setSearchValue(value)
    }

    const addToFav = (id) =>{
        const copyList = [...pics];
        let index = copyList.findIndex((row)=>row.id == id)
        copyList[index].isFav = true
        setPics(copyList)
    }
    return (
      <div className="App">
        <div className='search-wrapper'>
            <Search
                addonBefore="Search by"
                placeholder="Search item"
                allowClear
                onSearch={onSearch}
            />
        </div>
        <div className='wrapper'>
            {pics.length>0 ?
                <>
                    <Row justify="start" gutter={10}>
                        {pics?.map(pic=>
                            <Col xs={24} xl={8}>
                                <div className='image_wrapper'>
                                    <img alt="flickr"
                                         src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
                                    />
                                    <span onClick={()=>addToFav(pic.id)}>
                                        {pic?.isFav?
                                            <AiFillHeart size={30} color={'#b355bb'}/> : <AiOutlineHeart size={30} color={'#b355bb'}/>
                                        }
                                    </span>
                                </div>
                            </Col>
                        )}
                    </Row>
                    <div className='pagination'>
                        <Pagination  defaultCurrent={1}
                                     total={total}
                                     onChange={onChangePagination}
                                     pageSizeOptions={[10, 20, 50]}
                        />
                    </div>
                </>
                :
                <div className='empty-state'>
                    There is no data here
                </div>
            }
        </div>
    </div>
    );
}

export default App;
