import MarkdownIt from 'markdown-it';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { creteNewSpecialty, getAllSpecialtyService } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import './ManageSpecialty.scss';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }
    async componentDidMount () {
        let res = await getAllSpecialtyService()
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }

    }




    async componentDidUpdate( prevProps,prevState,snapshot){
    if(this.props.language !== prevProps.language ){
        
        }
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
            
        })
    }
    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64 : base64
            })
        }
    }
    handleSaveSpecialty =  async () => {
        let res = await creteNewSpecialty(this.state)
        if(res && res.errCode === 0) {
            toast.success('Create success!')
        }else{
            toast.error('Error')
        }
        console.log("check", this.state)
    }

    handleEditUser = () => {

    }
    handleDeleteUser = () => {
        
    }
    render() {
        let {dataSpecialty} = this.state
        return (
            <>
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                
                <div className='add-new-all-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control' type='text' value={this.state.name} 
                            onChange={(event)=>this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control-file' type='file'
                            onChange={(event)=>this.handleOnchangeImg(event)}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={()=> this.handleSaveSpecialty()}
                        >Lưu</button>
                    </div>
                    
                </div>
                <div className='table-specialty'>
                <table id="customers">
                <tbody>

                    <tr>
                        <th>STT</th>
                        <th>Tên chuyên khoa</th>
                        <th>Actions</th>
                    </tr>
                    {dataSpecialty && dataSpecialty.length &&
                        dataSpecialty.map((item, index)=>{
                            return (
                                <tr key={item.index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className='btn-edit'
                                        onClick={()=> this.handleEditUser(item)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                        onClick={()=> this.handleDeleteUser(item)}
                                        ><i className="fas fa-trash"></i></button>
                                    </td> 
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    </table>
                </div>
            </div>
            </>
                    
                        
                
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
