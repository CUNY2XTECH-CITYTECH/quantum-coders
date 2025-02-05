//import React /*,{useState}*/ from "react";
import "./Style.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineAccountCircle, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { IoSend } from "react-icons/io5";


export const FormSignUp = () => {

// set the requirement on each filling form
    /*const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [state, setState] = React.useState({
        email: "",
        password: ""
      });
      const handleChange = evt => {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      };
      const handleSubmit = evt => {
        evt.preventDefault();
        console.log(state);
      };*/

    return (
        <>
        <div className="form-container">
            <div className="header">
                <div className="text">Create Account</div>
            </div>
            <form>
                <div className="inputs">
                    <div className="input-field">
                        <p className="tilted">Full name</p>
                        <div className="input-icon">
                            <MdOutlineDriveFileRenameOutline />
                            <input type="text" className="input-fullname" placeholder="Enter your fullname" />
                        </div>
                    </div>

                    <div className="input-field">
                        <p className="tilted">Username</p>
                        <div className="input-icon">
                            <MdOutlineDriveFileRenameOutline />
                            <input type="text" className="input-username" placeholder="Enter your username" />
                        </div>
                    </div>
                    <div className="input-field">
                        <p className="tilted">E-mail</p>
                        <div className="input-icon">
                            <MdOutlineAccountCircle />
                            <input type="email" className="input-email" placeholder="Enter your email" />
                        </div>
                    </div>
                     <div className="input-field">
                        <p className="tilted">Password</p>
                        <div className="input-icon">
                            <RiLockPasswordLine />
                            <input type="password" className="input-password" placeholder="Enter your password" />
                        </div>
                    </div>
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Have a Account?</button>
                    <button>
                        <IoSend />
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};
