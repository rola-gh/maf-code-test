import './App.css';
import {useEffect, useState} from "react";
import {Col, Row} from 'antd';
import {getImageList} from "./API";

function App() {
    const [pics, setPics] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [page, setPage] = useState(1)

    /**Get Item list **/
    useEffect( () => {
         getImageList(perPage, page).then(res => setPics(res))
    },[perPage, page])

  return (
    <div className="App">
        <div className='wrapper'>
            <Row justify="start" gutter={10}>
            {pics?.map(pic=>
                <Col xs={24} xl={8} >
                    <div className='image_wrapper'>
                        <img alt="flickr" src={`https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`}/>
                    </div>
                </Col>
            )}
            </Row>
        </div>
    </div>
  );
}

export default App;
