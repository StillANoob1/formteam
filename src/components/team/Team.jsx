import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '../../slice/teamSlice';
import { MdClose } from "react-icons/md";
import "./team.scss";


const Team = ({setShow}) => {
    const teamUsers = useSelector((state)=> state.team)
    const dispatch=useDispatch();
    const handleRemoveTeam=(user)=>{
        dispatch(remove(user.id))
    }
  return (
    <>
    <div className="team">
            <div className="teamHeading">
               <h1>
                Your team members
               </h1>
                <MdClose
                    className="close-btn"
                    onClick={() => setShow(false)}
                />
            </div>
            {teamUsers?.users?.length==[] && (
                    <div className="empty">
                        <span>Currently there is no member in your team</span>
                        <button className="return" onClick={() => {
                            setShow(false)
                        }}>
                            ADD MEMBER
                        </button>
                    </div>
                )}

            <div className="cards">
                {teamUsers?.users?.map((user) => (
                    <div className="card" key={user.id}>
                <img src={user.avatar} alt="avatar" />
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <p>{user.email}</p>
                {user.available && <button onClick={() => handleRemoveTeam(user)} >Remove from team</button>}
                <div className="bottom">
                <div className="content">
               <div className="info">
               <span className='heading'>Gender:</span>  <span className='value'>  {user.gender}</span><br/>
               </div>
               <div className="info">
               <span className='heading'>Domain:</span><span className='value'>  {user.domain}</span><br/>
               </div>
               <div className="info">
               <span className='heading'>Status:</span> <span className='value'>   {user.available ? "Available" : "Not Available"}</span>
               </div>
                </div>
               
                </div>
            </div>
                ))}
            </div>
           
        </div>
      
    </>
  )
}

export default Team