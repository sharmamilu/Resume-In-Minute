import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser  } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const success = registerUser(data.email, data.password, data.name, data.contact, data.address);
        if (success) {
            navigate("/");
        } else {
            alert("Registration failed");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2 className="login-title">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* add name, contact, address */}
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: "Name is required" })}
                            className="form-input"
                        />
                    </div>
                    {errors.name && <p className="error">{errors.name.message}</p>}


                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Contact"
                            {...register("contact", { 
                                required: "Contact is required",
                                pattern: {
                                  value: /^[0-9]{10}$/,
                                  message: "Invalid contact number"
                                }
                            })}
                            className="form-input"
                        />
                    </div>
                    {errors.contact && <p className="error">{errors.contact.message}</p>}

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Address"
                            {...register("address", { required: "Address is required" })}
                            className="form-input"
                        />
                    </div>
                    {errors.address && <p className="error">{errors.address.message}</p>}

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email",{
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }
                            })}
                            className="form-input"
                        />
                    </div>
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password",
                                {
                                  required: "Password is required",
                                  minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                  }
                                },
                                  )}
                            className="form-input"
                        />
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                    
                    <button type="submit" className="btn register-btn">
                        Register
                    </button>
                    <p>
                        Already have an account? <a href="/">Login</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register