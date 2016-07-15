import React from 'react'
import ReactDOM from 'react-dom'


export default class ModalView  extends React.Component{
  constructor (props) {

    super(props);
    this.state = {
      session: ''
    };

  }
  render () {
    return <div id="modalContainer" className="modal fade" tabindex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 id="modalTitle" className="modal-title">Modal title</h4>
                </div>
                <div  className="modal-body">
                  <p id="modalBody" >One fine body&hellip;</p>
                </div>
                <div id="modalFooter" className="modal-footer">
                  <button id="noButton" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button  id="yesButton"  type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
  }
}
