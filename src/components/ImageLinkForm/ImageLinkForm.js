import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div >
            <p className='f3 center'>
                {'This magic brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 br2' type="text" onChange={onInputChange}/>
                    <button
                      className='w-30 grow f4 link ph3 pv2 br2 dib white bg-light-purple'
                      onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
