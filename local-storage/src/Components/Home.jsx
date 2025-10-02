import React, { useEffect } from 'react'
import { useState } from 'react'

export default function Home() {

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [date, setDate] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [country, setCountry] = useState("");
    const [existing_data, setExisting_data] = useState([]);
    const [editingId, setEditingId] = useState(null)
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("local")) || [];
        setExisting_data(stored);
    }, []);


    const submitForm = () => {
        if (editingId !== null) {
            const updatedData = existing_data.map((data) =>
                data.id === editingId
                    ? { id: editingId, name, age, date, gender, status, nationality: country }
                    : data
            );
            localStorage.setItem("local", JSON.stringify(updatedData));
            setExisting_data(updatedData);
            setEditingId(null);
        } else {
            const new_id = existing_data.length > 0 ? existing_data[existing_data.length - 1].id + 1 : 0;
            const data = { id: new_id, name, age, date, gender, status, nationality: country };
            const updatedData = [...existing_data, data];
            localStorage.setItem("local", JSON.stringify(updatedData));
            setExisting_data(updatedData);
        } setName("");
        setAge(0);
        setDate("");
        setGender("");
        setStatus("");
        setCountry("");

    }
    const deleteData = (id) => {
        const updated = existing_data.filter((data) => data.id !== id);
        setExisting_data(updated);
        localStorage.setItem("local", JSON.stringify(updated));
    };
    const updateData = (id) => {
        const updated = existing_data.filter((data) => {
            if (data.id == id) {
                setName(data.name)
                setAge(data.age)
                setDate(data.date)
                setGender(data.gender)
                setStatus(data.status)
                setCountry(data.nationality)
            }
        })
        setExisting_data(updated);
        localStorage.setItem("local", JSON.stringify(updated));
    }

    return (
        <div>
            <h1>Sign in</h1>
            <div>
                <label>name:</label>
                <input placeholder='enter the name..' type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>age:</label>
                <input placeholder='enter the age..' type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
                <label>date of birth:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
                <label>gender:</label>
                <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)
                } />male
                <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} />female
                <input type="radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)} />other
            </div>
            <div>
                <label>martial status:</label>
                <input type="radio" name="status" value="married" onChange={(e) => setStatus(e.target.value)} />married
                <input type="radio" name="status" value="not married" onChange={(e) => setStatus(e.target.value)} />not married
            </div>
            <div>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">select nationality</option>
                    <option value="indian">indian</option>
                    <option value="african">african</option>
                    <option value="american">american</option>
                    <option value="canadian">canadian</option>
                    <option value="european">european</option>
                </select>
            </div>
            <div>
                <button onClick={() => submitForm()}>Submit</button>
            </div>
            <h1>Local Storage data</h1>
            {
                existing_data.map((data) => (
                    <div key={data.id}>
                        <h3>{data.name}</h3>
                        <h5>{data.age}</h5>
                        <h5>{data.date}</h5>
                        <h5>{data.gender}</h5>
                        <h5>{data.status}</h5>
                        <h5>{data.nationality}</h5>
                        <button onClick={() => updateData(data.id)}>update</button>
                        <button onClick={() => deleteData(data.id)}>delete</button>
                    </div>
                ))
            }

        </div>
    )
}
