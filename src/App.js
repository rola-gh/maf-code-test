import './App.css';
import {useEffect, useState} from "react";
import {Col, Pagination, Row} from 'antd';
import {getImageList} from "./API";

function App() {
    const [pics, setPics] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(1)

    /**Get Item list **/
    useEffect( () => {
         getImageList(perPage, page).then(res => {
             setPics(res.photo)
             setTotal(res.pages)
         } )
    },[perPage, page])

    /**Pagination**/
    const onChangePagination = (pageNumber,pageSize) => {
        setPage(pageNumber)
        setPerPage(pageSize)
    };

  return (
    <div className="App">
        <div className='wrapper'>
            <Row justify="start" gutter={10}>
            {pics?.map(pic=>
                <Col xs={24} xl={8}>
                    <div className='image_wrapper'>
                        <img alt="flickr"
                             src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}
                        />
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
        </div>
    </div>
  );
}

export default App;
