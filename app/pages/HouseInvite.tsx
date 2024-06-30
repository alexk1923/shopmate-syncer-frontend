import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import { useHouseStore } from "../store/useHouseStore";
import QRCode from "react-native-qrcode-svg";
import { useHouse } from "../hooks/useHouse";
import RestyleBox from "@/components/layout/RestyleBox";
import Avatar from "@/components/misc/Avatar";

const HouseInvite = () => {
	const house = useHouseStore((state) => state.house);
	const { width } = useWindowDimensions();

	return (
		<Wrapper>
			<RestyleText color='primary' variant='header'>
				{house?.name}
			</RestyleText>

			<RestyleBox flexDirection='row'>
				{house?.members.map((member) => (
					<RestyleBox alignItems='center' key={member.id}>
						<Avatar
							uri={member.profilePicture}
							firstName={member.firstName}
							lastName={member.lastName}
							onClick={() => {}}
						/>
						<RestyleText fontWeight='bold' color='text'>
							{member.username}
						</RestyleText>
					</RestyleBox>
				))}
			</RestyleBox>
			<RestyleText variant='subheader' color='text'>
				Use the QR code to invite your roomies
			</RestyleText>
			<RestyleBox style={{ alignItems: "center", flex: 1 }}>
				{house && <QRCode size={width * 0.5} value={house?.id.toString()} />}
			</RestyleBox>
		</Wrapper>
	);
};

export default HouseInvite;
