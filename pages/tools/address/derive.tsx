import type { NextPage } from "next"
import { useState } from "react"
import { deriveAddress } from "../../../utils";

export const config = { runtime: 'edge' };

type Address = string & { __new_type_id: "Address" };
function isAddress(value: any): value is Address {
    return typeof value === "string" && value.startsWith("0x") && value.length === 42;
}

const AddressDerivationPage: NextPage = () => {
    const [address, setAddress] = useState("");
    const [key, setKey] = useState("");
    const [derivedAddress, setDerivedAddress] = useState("...");
    return (
        <div className="w-auto flex justify-center h-screen">
            <div className="flex gap-3 flex-col justify-center">
                <div className="w-auto">
                    <label className="float-left">Address</label>
                    <input placeholder="Enter valid address" onChange={e => setAddress(e.target.value)} className={`p-1 ml-4 w-96 float-right ${isAddress(address) ? "border-solid border border-black" : "border-solid border-8 border-red-500"}`} name="address" value={address} />
                </div>
                <div className="w-auto">
                    <label className="float-left">Key</label>
                    <input onChange={e => setKey(e.target.value)} className="p-1 ml-4 w-96 float-right border-solid border border-black" name="key" value={key}/>
                </div>
                <div className="flex justify-center">
                    <button onClick={() => deriveAddress(address as Address, key).then(setDerivedAddress)} className="rounded-none bg-blue-500 text-white h-12 w-full">Derive</button>
                </div>
                <p className="text-center">The derived address is <b>{derivedAddress}</b></p>
            </div>
        </div>
    )
}

export default AddressDerivationPage
