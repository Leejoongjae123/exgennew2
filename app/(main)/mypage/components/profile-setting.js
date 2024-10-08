"use client";

import * as React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Icon } from "@iconify/react";
import { Button, Badge, Input, Spacer, Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
// import { animals } from "./data";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { cn } from "./cn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export default function ProfileSetting() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankList, setBankList] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedImages, setSelectedImages] = useState([
    "/images/product/product-3.jpg",
  ]);
  const supabase = createClient();

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
    } else {
      console.log("User fetched successfully:", data);
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();
      if (profileError) {
        console.error("Error fetching profile:", profileError);
      } else {
        console.log(profileData);
        setNickname(profileData.nickname);
        setEmail(profileData.email);
        setPhone(profileData.phone);
        setBank(profileData.bankaccountname);
        setAccountNumber(profileData.bankaccountno);
        setAvatarUrl(profileData.avatar_url);
      }
    }
  };

  const getBankList = async () => {
    const { data, error } = await supabase.from("bank").select("*");
    if (error) {
      console.error("Error fetching bank list:", error);
    } else {
      setBankList(data);
    }
  };


  useEffect(() => {
    getUser();
    getBankList();
  }, []);
  console.log(bankList);

  // Ensure bank state is set correctly
  useEffect(() => {
    console.log('bank:', bank);
  }, [bank]);

  const uploadImages = async () => {
    const file = document.getElementById("avatarInput").files[0];
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      console.log("data:", data);
      if (error) {
        console.error("Error uploading avatar:", error);
        toast("프로필 수정 실패");
        return null;
      }
      const uploadUrl =
        "https://rxgvhikbaexklehfaurw.supabase.co/storage/v1/object/public/avatars/" +
        data.path;
      console.log("uploadUrl:", uploadUrl);
      return uploadUrl;
    }
    return null;
  };

  const handleSubmit = async () => {
    const uploadUrl = await uploadImages();
    console.log("uploadUrl:", uploadUrl);
    const updateData = {
      email: email,
      phone: phone,
      bankaccountname: bank,
      bankaccountno: accountNumber,
    };

    if (uploadUrl) {
      updateData.avatar_url = uploadUrl;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("nickname", nickname);

    if (error) {
      console.error("Error updating profile:", error);
      toast("프로필 수정 실패");
    } else {
      console.log("Profile updated successfully:", data);
      toast("프로필 수정 성공");
    }
  };
  console.log(avatarUrl);
  console.log('bank:',bank);
  console.log('bankList:',bankList);
  return (
    <div className="p2">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div>
        <p className="text-base font-medium text-default-700">내 정보</p>
        <p className="mt-1 text-sm font-normal text-default-400"></p>
        <Card className="mt-4 bg-default-100" shadow="none">
          <CardBody>
            <div className="flex items-center gap-4">
              <div>
                <div
                  onClick={() => document.getElementById("avatarInput").click()}
                  className="w-15 h-15 relative"
                >
                  <img
                    src={avatarUrl || "/images/logo-icon-2.png"}
                    className=" w-10 h-10 rounded-full cursor-pointer object-cover"
                    alt="Profile Avatar"
                    
                  />
                </div>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAvatarUrl(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-default-600">
                  {nickname}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Spacer y={4} />
      {/* Title */}
      <div>
        <p className="text-base font-medium text-default-700">이메일</p>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2"
          placeholder="이메일 주소를 입력해주세요."
        />
      </div>
      <Spacer y={2} />
      {/* Location */}
      <div>
        <p className="text-base font-medium text-default-700">연락처</p>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2"
          placeholder="연락처를 입력해주세요."
        />
      </div>
      <Spacer y={4} />
      <div>
        <p className="text-base font-medium text-default-700">출금계좌</p>
        <div className="grid grid-cols-1 ">
          <div className="col-span-1">
            <Select 
              placeholder="은행명" 
              className="w-full bg-gray-100 px-5 text-gray-500"
              onChange={(e) => setBank(e.target.value)}
              value={bank}
              selectedKeys={[bank]}
            >
              {bankList.map((bankItem) => (
                <SelectItem key={bankItem.bankname} value={bankItem.bankname}>
                  {bankItem.bankname}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="col-span-4">
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="mt-2 text-gray-500"
              placeholder="계좌번호"
            />
          </div>
        </div>
      </div>
      <Spacer y={4} />
      {/* Biography */}

      <Button onClick={handleSubmit} color="primary" size="sm">
        수정
      </Button>
    </div>
  );
}
