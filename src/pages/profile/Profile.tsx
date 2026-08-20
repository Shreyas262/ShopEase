import ProfileCard from "../../components/profile/ProfileCard";
import ProfileInfo from "../../components/profile/ProfileInfo";
import LogoutButton from "../../components/profile/LogoutButton";
import AddressSection from "../../components/profile/AddressSection";
import PasswordSection from "../../components/profile/PasswordSection";
import EditProfileModal from "../../components/profile/EditProfileModal";
import AccountSection from "../../components/profile/AccountSection";
import { useState } from "react";
import SEO from '../../components/seo/SEO'
import "./profile.scss";

function Profile() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="profile-section">
            <SEO
                title="Profile"
                description="Manage your ShopEase account."
            />

            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <div className="profile-container">

                <ProfileCard
                    onEdit={() => setIsModalOpen(true)}
                />

                <div className="profile-content">

                    <AccountSection />

                    <ProfileInfo />

                    <AddressSection />

                    <PasswordSection />

                    <LogoutButton />

                </div>

            </div>

        </section>
    );
}

export default Profile;