import React, { useState, useEffect } from "react";
import axios from "axios";
import "../userfriendly_page/Rooms.css";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchRooms();
    fetchResidents();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const fetchResidents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/residents/all');
      setResidents(response.data); // Store all residents in state
    } catch (error) {
      console.error('Error fetching residents:', error);
    }
  };

  const getColor = (freeBeds) => {
    if (freeBeds === 4) return "darkgreen";
    if (freeBeds === 3) return "#6B8E23";
    if (freeBeds === 2) return "#9ACD32";
    if (freeBeds === 1) return "orange"
    return "red"; // for 0 free beds
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
  };

  const closeDetails = () => {
    setSelectedRoom(null);
  };

  return (
    <div className="room-page">
    <h2>Room Management</h2>
      <div className="room-container">
        <h1>Etajul 1</h1>
        <div className="room-grid">
          {rooms.map((room) => {
            const occupationPercentage = ((1 - room.freeBeds / room.capacity) * 100).toFixed(2);
            return (
              <div
                key={room.roomNumber}
                className="room-card"
                style={{ backgroundColor: getColor(room.freeBeds) }}
                onClick={() => handleRoomClick(room)}
              >
                <h3>Camera {room.roomNumber}</h3>
                <p>{occupationPercentage}% ocupat ({room.freeBeds} locuri libere)</p>
              </div>
            );
          })}
        </div>

        {selectedRoom && (
          <div className="room-details">
            <button className="close-button" onClick={closeDetails}>
              Închide
            </button>
            <h2>Detalii pentru Camera {selectedRoom.roomNumber}</h2>
            <p>
              {((1 - selectedRoom.freeBeds / selectedRoom.capacity) * 100).toFixed(2)}% ocupat
            </p>
            <p>{selectedRoom.freeBeds} locuri libere</p>
            <h3>Rezidenți:</h3>
            <ul>
              {residents
                .filter((resident) => resident.id_room === selectedRoom.roomNumber)
                  .length > 0 ? (
                    residents
                      .filter((resident) => resident.id_room === selectedRoom.roomNumber)
                      .map((resident, index) => (
                        <li key={index}>{`${resident.firstName} ${resident.lastName}`}</li>
                      ))
                  ) : (
                <li>No residents found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomList;
