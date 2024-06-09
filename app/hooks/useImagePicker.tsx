import * as ImagePicker from "expo-image-picker";

export const useImagePicker = () => {
	const pickImage = async () => {
		try {
			console.log("imi dau pick image");

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1], // Set aspect ratio for circular crop
				quality: 1,
				base64: true,
			});

			if (!result.canceled) {
				const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
				return base64Image;
			}

			return null;
		} catch (error) {
			console.error("error picking image:");
			console.log(error);
			return null;
		}
	};

	const takePhoto = async () => {
		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
			base64: true,
			cameraType: ImagePicker.CameraType.front,
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
		});

		if (!result.canceled) {
			const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
			return base64Image;
		}
	};

	return { pickImage, takePhoto };
};
