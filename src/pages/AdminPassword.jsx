import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminPassword(){
const [userEmail, setUserEmail] = useState("");
const [password,setPassword] = useState("");
const [confirm,setConfirm] = useState("");
const [currentPassword, setCurrentPassword] = useState("");
const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

const [loading,setLoading] = useState(false);

  async function handleSubmit(e){

    e.preventDefault();

    if(password !== confirm){
  alert("兩次輸入的密碼不一致");
  return;
}

    if(password.length < 8){
  alert("密碼至少8碼");
  return;
}


    if(!window.confirm("確定要修改登入密碼嗎？")){
  return;
}
    setLoading(true);

// 重新登入驗證目前密碼
const {
  data: signInData,
  error: signInError
} = await supabase.auth.signInWithPassword({

  email: userEmail,
  password: currentPassword

});

if (signInError) {

  setLoading(false);

  alert("目前密碼錯誤");

  return;
}

// 更新目前 Session
await supabase.auth.setSession({

  access_token: signInData.session.access_token,
  refresh_token: signInData.session.refresh_token

});

// 修改密碼
// 修改密碼（透過 Edge Function）
// ===== 呼叫 Edge Function =====

// ===== 呼叫 Edge Function：修改密碼 =====

const response = await fetch(
  "https://nfhilpjladaaibfwygkj.supabase.co/functions/v1/change-password",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": "sb_publishable_9xnyp4lTL35nCLz7piBBOg_K8jfKWFE",
      "Authorization": `Bearer ${signInData.session.access_token}`,
    },
    body: JSON.stringify({
      userId: signInData.user.id,
      newPassword: password,
    }),
  }
);

const result = await response.json();

console.log("Edge Function 回傳", result);

if (!response.ok || !result.success) {

  console.log("完整回傳", result);

  setLoading(false);

  alert(
    result.error?.message ||
    result.message ||
    "密碼修改失敗"
  );

  return;
}






setCurrentPassword("");
setPassword("");
setConfirm("");

alert("密碼已修改成功，請使用新密碼重新登入。");

await supabase.auth.signOut();

window.location.href = "/admin/login";
  }

  useEffect(() => {

  async function loadUser() {

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      setUserEmail(user.email);
    }

  }

  loadUser();

}, []);


  return(
<main className="pt-[140px] px-6 pb-20">

<div className="max-w-xl mx-auto">

  <h1 className="text-3xl text-white font-light mb-10">
    修改登入密碼
  </h1>

<p className="text-white/60 text-sm mb-4">
  目前登入：
  <span className="text-[#C8A46A] ml-2">
    {userEmail}
  </span>
</p>

<form
  onSubmit={handleSubmit}
  className="space-y-6"
>
{/* 目前密碼 */}
<div className="relative">

  <input
    type={showCurrentPassword ? "text" : "password"}
    placeholder="請輸入目前密碼"
    value={currentPassword}
    onChange={e => setCurrentPassword(e.target.value)}
    required
    className="
      w-full
      h-[52px]
      rounded-xl
      border
      border-white/20
      bg-white/5
      text-white
      px-4
      pr-14
      outline-none
      focus:border-[#C8A46A]
      placeholder:text-white/40
    "
  />

  <button
    type="button"
    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-xs
      text-[#C8A46A]
      hover:underline
    "
  >
    {showCurrentPassword ? "隱藏" : "顯示"}
  </button>

</div>

{/* 新密碼 */}
<div className="relative">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="請輸入新密碼"
    value={password}
    onChange={e => setPassword(e.target.value)}
    required
    className="
      w-full
      h-[52px]
      rounded-xl
      border
      border-white/20
      bg-white/5
      text-white
      px-4
      pr-14
      outline-none
      focus:border-[#C8A46A]
      placeholder:text-white/40
    "
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-xs
      text-[#C8A46A]
      hover:underline
    "
  >
    {showPassword ? "隱藏" : "顯示"}
  </button>

</div>


  {/* 確認新密碼 */}
  <div className="relative">

    <input
      type={showConfirm ? "text" : "password"}
      placeholder="再次輸入新密碼"
      value={confirm}
      onChange={e => setConfirm(e.target.value)}
      required
      className="
        w-full
        h-[52px]
        rounded-xl
        border
        border-white/20
        bg-white/5
        text-white
        px-4
        pr-14
        outline-none
        focus:border-[#C8A46A]
        placeholder:text-white/40
      "
    />

    <button
      type="button"
      onClick={() => setShowConfirm(!showConfirm)}
      className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-xs
        text-[#C8A46A]
        hover:underline
      "
    >
      {showConfirm ? "隱藏" : "顯示"}
    </button>

  </div>

  <button
    type="submit"
    disabled={loading}
    className="
      w-full
      h-[52px]
      rounded-xl
      bg-[#C8A46A]
      text-white
      hover:opacity-90
      transition
    "
  >
    {loading ? "修改中..." : "修改密碼"}
  </button>

</form>



  </div>

</main>
);

}