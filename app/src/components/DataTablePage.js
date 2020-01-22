import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import DataTable from 'datatables.net'
const url = "http://localhost:8080/"

$.DataTable = DataTable

export default class DataTablePage extends React.Component{
        state = {
            emojis: [],
        }

    componentDidMount(){

        axios.get(url).then(res =>{
            this.setState({emojis : res.data})
            var table = $('#myTable').DataTable( {
                data: res.data,
                columns: [
                    {'data':'emoji'},
                     {'data':"description"},
                     {'data':"category"},
                     {'data':"aliases"},
                     {'data':"tags"},
                     {'data':"unicode_version"},
                     {'data':"ios_version"}
                ]
             } )

             $('#myTable tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    $('#button').addClass('hidden');
                $('#edit').addClass('hidden');
                    $(this).removeClass('selected');
                }
                else {
                    $('#button').removeClass('hidden');
                $('#edit').removeClass('hidden');
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            } );
         
            $('#button').click( function () {
                if($('.selected')[0]){
                    let i = $('.selected')[0]._DT_RowIndex;
               table.row('.selected').remove().draw( false );
               axios.delete(url,{ data: { id: i } }).then(res =>{
            })

            }
            } );

            $('#edit').click( function () {
                let i = $('.selected')[0]._DT_RowIndex;
               $('#ID').html(i);

               /*
               tutaj setowac pojemniki INPUTY
               
               */
            })
            


             
        })


        
    }

    addItem(e){
        e.preventDefault();
        const {emojis} = this.state;

        const newItem = {
            'emoji':this.newEmojis.value,
            'description':this.newDescription.value,
            'category':this.newCategory.value,
            "aliases": this.newAliases.value,
            "tags": this.newTag.value,
            "unicode_version":this.newUC.value,
            "ios_version":this.newIOSC.value
        }

        
        $('#myTable').DataTable().row.add(newItem).draw();
        this.setState({
            emojis: [...this.state.emojis,newItem]
        })

        axios.post(url,newItem).then(res =>{

        })

    }

    removeItem(item){
        const newEmojis = this.state.emojis.filter(buyItems => {
            return buyItems !== item;
        });

        this.setState({
            emojis: [...newEmojis]
        })

    }

    render(){ 
        $('#submitBT').click(function() {
           console.log("ss");
           $( "#closeBT" ).click();
        });
        
        return(
            
            <div className="container m-5">
            <button id="button" className="btn btn-danger d-block hidden">Delete</button>
            <button id="edit"type="button" className="btn hidden btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Edit
            </button>
            <button id="new"type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Add Item
            </button>
            <table id="myTable" className="display">
                <thead>
                <tr>
                    <th> emoji</th>
                    <th>description</th>
                    <th >category</th>
                    <th>aliases</th>
                    <th>tags</th>
                    <th>unicode version</th>
                    <th>ios version</th>
                </tr>
                </thead>               
            </table>
            
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div id="xxx" class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="addForm"className="form-inline mt-5" onSubmit={(e) => {this.addItem(e)}}>
      <div class="modal-body">
      <div id="ID" className="hidden">0</div>
          <p className="modal-dialog item">Emoji:</p>
        <input ref={input => this.newEmojis = input} id="newEmoji" className="modal-input"></input>
        <p className="modal-dialog item">Description:</p>
        <input ref={input => this.newDescription = input} id="newDescription" className="modal-input"></input>
        <p className="modal-dialog item">Category:</p>
        <input ref={input => this.newCategory = input} id="newCategory" className="modal-input"></input>
        <p className="modal-dialog item">Alias:</p>
        <input ref={input => this.newAliases = input} id="newAliases" className="modal-input"></input>
        <p className="modal-dialog item">Tag</p>
        <input ref={input => this.newTag = input} id="newTags" className="modal-input"></input>
        <p className="modal-dialog item">Unicode V.</p>
        <input ref={input => this.newUC= input} id="newUC" className="modal-input"></input>
        <p className="modal-dialog item">IOS V.</p>
        <input ref={input => this.newIOSC = input} id="newIOSCD" className="modal-input"></input>
        
      </div>
      <div class="modal-footer">
        <button id="closeBT" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button id="submitBT" type="submit" class="btn btn-primary" >Save changes</button>
      </div> 
      </form>
    </div>
  </div>
</div>
      </div>
        )
    }
};
