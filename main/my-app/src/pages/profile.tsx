import { UserProfile } from "@clerk/clerk-react";
 
const UserProfilePage = () => (
  <UserProfile path="/profile" routing="path" />
);
 
export default UserProfilePage;