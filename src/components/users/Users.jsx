import React, { useState, useEffect } from "react";
import { users } from "../../data";
import "./users.scss"
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../slice/teamSlice";
import User from "./user/User";
import { AiOutlineSearch } from "react-icons/ai";
import Team from "../team/Team";


const Users = () => {
   
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedAvailability, setSelectedAvailability] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(20);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const teamMember = useSelector((state)=>state.team)



    const handleSearch = (user) => {
        const name = `${user.first_name} ${user.last_name}`.toLowerCase();
        const domain = user.domain.toLowerCase();
        const gender = user.gender.toLowerCase();
        const available = user.available;

        return (
            (name.includes(searchTerm.toLowerCase()) || !searchTerm) &&
            (domain.includes(selectedDomain.toLowerCase()) || !selectedDomain) &&
            (gender === selectedGender || !selectedGender) &&
            (available === (selectedAvailability === "true") || !selectedAvailability)
        );
    };

    const filteredUsers = users.filter((user) => handleSearch(user));

    // Logic for displaying users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleAddtoTeam = (user) => {
        dispatch(add(user));
    }



    return (
        <div className="container">
       <div className="showTeam">
       <h1  onClick={() => setShow(true)}>Your Team {teamMember?.users?.length}</h1>
       </div>
        { show && <Team setShow={setShow}/>}
            <div className="filters">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="icon">
                    <AiOutlineSearch />
                    </div>
                </div>
                <div className="selectFilters">
                <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                >
                    <option value="">Select Domain</option>
                    <option value="sales">Sales</option>
                    <option value="finance">Finance</option>
                    <option value="marketing">Marketing</option>
                    <option value="it">IT</option>
                    <option value="management">Management</option>
                </select>
                <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="agender">Agender</option>
                </select>
                <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                >
                    <option value="">Select Availability</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
                </div>
            </div>

            <div className="cards">
                {
                    currentUsers.map((user) => {
                        return <User key={user.id} user={user} handleAddtoTeam={handleAddtoTeam} />
                    })
                }
            </div>
            <div className="pagination">
                <button className="pageButton"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={currentPage === number ? "active" : "notActive"}
                    >
                        {number}
                    </button>
                ))}
                <button className="pageButton"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === pageNumbers.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Users;
