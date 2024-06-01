import React from "react";
import { useAuthStore } from "../store/useUserStore";
import HomePage from "../pages/HomePage";
import NoHomeScreen from "../pages/NoHomeJoined";

const Home = () => {
	const user = useAuthStore().user;

	return user?.houseId ? <HomePage /> : <NoHomeScreen />;
};

export default Home;
