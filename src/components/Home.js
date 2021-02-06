// where the actual animals are disappearing and where we are measuring mic sensitivity 
import React, { useState } from 'react';

// class Home extends Component {
//     handleDeleteAnimal = () => {
//         const{ id } = this.props.animalSelected;
//         this.props.deleteAnimal(id);
//     };

//     handleShowAnimal = animal => {
//         this.props.updateSingleAnimal(animal);
//     };

//     toggleShowUpdate = () => {
//         this.props.toggleShowUpdate();
//     };

//     render() {
//         return (
//             <>
//             <Nav />
//             <div className="Animal-Container">
//                 <ul className="Animal-List">
//                     {this.props.animals.map(animal => {
//                         return (
//                             <li onClick={() =>
//                             this.handlerShowAnimal(animal)}
//                             key={animal.id}>
//                                 {animal.name}
//                             </li>
//                         );
//                     })}
//                 </ul>
//                 {Object.keys
//                 (this.props.animalSelected).length > 0 ?(
//                     <SelectedAnimal
//                         handleShowAnimal={this.handleShowAnimal}
//                         toggleShowUpdate={this.toggleShowUpdate}
//                         handleDeleteAnimal={this.handleDeleteAnimal}
//                         selected={this.props.animalSelected}
//                     />
//                 ) : null}
//                 {/* {this.props.showUpdate ? (
//                     <UpdateSignupForm friend={this.props.animalSelected} />
//                 ) : null} */}

//                 {/* //Need to input logo */}
//                 {this.props.deletingAnimal ? (
//                     <img src={logo} className="App-logo" alt="logo" />
//                 ) : null}
//             </div>
//             </>
//         );
//     }
// }

function Home(props) {


    return (
        <div>
            Home
            
        </div>
    );
}

export default Home;



// export default Animals;