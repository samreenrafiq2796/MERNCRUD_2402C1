import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

export default function GetData() {
    let [data, setData] = useState([])
    let [uname, setUName] = useState("")
    let [uage, setUAge] = useState(0)
    let [id, setId] = useState("")
    let [search, setSearch] = useState("")
    let [sort, setSort] = useState("")



    useEffect(() => {
        fetch()
    }, [])
    async function fetch() {
        try {
            await axios.get("http://localhost:5003/lao").
                then((a) => {
                    setData(a.data.get_data)
                    console.log(a.data.get_data)
                }).catch((e) => {
                    console.log(e)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteuser(uid, uname) {
        if (window.confirm(`Are You Sure You want to delete ${uname} Record?`)) {
            await axios.delete(`http://localhost:5003/lao/${uid}`).
                then((a) => {
                    toast.success("User Deleted Successfully")
                    fetch()
                }).catch((e) => {
                    toast.error(e.response.data.msg)
                })
        }
    }

    // Update Work
    function setDatas(a, b, c) {
        setId(a)
        setUName(b)
        setUAge(c)
    }

    async function EditRecord() {
        try {
            await axios.put(`http://localhost:5003/lao/${id}`, {
                name: uname,
                age: uage
            }).then((a) => {
                fetch()
                document.querySelector(".closed").click();
                toast.success("Record Updated Successfully")
            }).catch((e) => {
                toast.error(e)
            })
        } catch (error) {
            toast.error(error)
        }
    }


    var filtered_data = search ?
        data.filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
        : data


    if (sort === "1"){
        filtered_data = filtered_data.sort((a,b)=>a.name.localeCompare(b.name))
    }
    else if(sort === "2"){
        filtered_data = filtered_data.sort((a,b)=>b.name.localeCompare(a.name))
    }
    else if(sort === "3"){
        filtered_data = filtered_data.sort((a,b)=>a.age - b.age)
    }
    else if(sort === "4"){
        filtered_data = filtered_data.sort((a,b)=>b.age - a.age)
    }
    return (
        <div className='container'>
            <ToastContainer />
            <Link className="btn btn-secondary mt-3" to="cr">Add Record</Link>
            <div className="container">
                <input type="text" className="form-control my-3"
                    placeholder='Enter Name to Search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />

                    <select className="form-select my-2" 
                    onChange={(e)=>setSort(e.target.value)}>
                        <option value="">Select Sorting</option>
                        <option value="1">A-Z (names)</option>
                        <option value="2">Z-A (names)</option>
                        <option value="3">Age Ascending</option>
                        <option value="4">Age Descending</option>
                    </select>
            </div>
            <div className="row">
                {
                    filtered_data.length != 0 ?

                        filtered_data.map((i) => (
                            <div className="col-md-3 my-3">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">{i.name}</h4>
                                        <p class="card-text"> Age : {i.age}</p>
                                        <p><i class="bi bi-trash3-fill btn btn-danger"
                                            onClick={() => {
                                                deleteuser(i._id, i.name)
                                            }}></i>

                                            <i class="bi bi-pencil btn btn-success mx-2"
                                                onClick={() => { setDatas(i._id, i.name, i.age) }}
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"></i></p>
                                    </div>
                                </div>

                            </div>
                        ))
                        :
                        <div>
                            <div
                                class="alert alert-danger alert-dismissible fade show"
                                role="alert"
                            >
                                <button
                                    type="button"
                                    class="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                ></button>
                                No User Found
                            </div>

                        </div>
                }

                {/* Modal code */}

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Update Record</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                                <p>Edit Your Name</p>
                                <input type="text" className="form-control my-3"
                                    onChange={(e) => setUName(e.target.value)}
                                    value={uname} />

                                <p>Edit Your Age</p>
                                <input type="number" className="form-control my-3"
                                    onChange={(e) => setUAge(e.target.value)}
                                    value={uage} />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary closed" data-bs-dismiss="modal" >Close</button>
                                <button type="button" class="btn btn-primary" onClick={EditRecord}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
