import axios from "axios";
import React from "react";

const TestPage: React.FC = () => {
    const getByID = async () => {
        console.log('get id')
        await axios('http://localhost:3000/getDataID/C1')
            .then(res => {
                console.log('res', res)
            })
            .catch(err => {
                console.warn('err', err)
            })
    }

    const getAllItem = async () => {
        console.log('get all')
        let data = {
            user_id: 'U1'
        };

        const CONFIG = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.post('http://localhost:3000/getAllClips', data, CONFIG)
            .then(res => {
                console.log('res', res)
            })
            .catch(err => {
                console.warn('err', err)
            })


    }

    return (
        <div>
            <div>

                <button onClick={() => getByID()}>getDataID</button>
            </div>

            <div>

                <button onClick={() => getAllItem()}>getAllClips</button>
            </div>
        </div>
    )
}

export default TestPage;