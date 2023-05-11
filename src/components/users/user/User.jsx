import React from 'react'
import "./user.scss"

const User = ({user,handleAddtoTeam}) => {
    return (
        <>
            <div className="card">
                <img src={user.avatar} alt="avatar" />
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <p>{user.email}</p>
                {user.available && <button onClick={() => handleAddtoTeam(user)} >Add to team</button>}
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
        </>
    )
}

export default User