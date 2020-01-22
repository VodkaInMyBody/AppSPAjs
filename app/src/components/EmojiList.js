import React from 'react'
import axios from 'axios'
const url = "http://localhost:8080/"

export default class EmojiList extends React.Component{
    state ={
        emojis:[],
    }

    componentDidMount(){
        axios.get(url).then(res =>{
            this.setState({emojis : res.data})
        })


    }

    render(){
        return(
            <div>
            <table id="table" class="display">
                <thead>
                <tr>
                    
                    <th >emoji</th>
                    <th>description</th>
                    <th >category</th>
                    <th>aliases</th>
                    <th>tags</th>
                    <th>unicode version</th>
                    <th>ios version</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.emojis.map((item,i)=>{
                        return (
                            <tr key={i}>
                            <td>{item.emoji}</td>
                            <td>{item.description}</td>
                            <td>{item.category}</td>
                            <td>{item.aliases}</td>
                            <td>{item.tags}</td>
                            <td>{item.unicode_version}</td>
                            <td>{item.ios_version}</td>
                            </tr>
                            
                        )
                    })
                }
                </tbody>
            </table>
        </div>
        )
    }
};

//{"emoji":"😀","description":"grinning face","category":"Smileys & Emotion","aliases":["grinning"],"tags":["smile","happy"],"unicode_version":"6.1","ios_version":"6.0"}
/*

        
*/