import { useState, useCallback } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import getCroppedImg, { type Crop } from "../utiles/cropImage";

interface UploadImageProps {
  imageSrc: string;
  setAvatar: (src: string) => void;
  setImageSrc?: (src: string | null) => void;
  setPhoto: (file: File) => void;
}

export default function UploadImage({
  imageSrc,
  setAvatar,
  setImageSrc,
  setPhoto,
}: UploadImageProps) {
  const [crop, setCrop] = useState({ x: 40, y: 50 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Crop | null>(null);

  const onCropComplete = useCallback((_: Crop, croppedAreaPixels: Crop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onSubmit = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], "cropped.jpg", {
        type: "image/jpeg",
      });
      const previewUrl = URL.createObjectURL(croppedBlob);
      setAvatar(previewUrl);
      setPhoto(croppedFile);
      if (setImageSrc) setImageSrc(null);
    }
  };

  return (
    <Paper className="p-4 bg-cyan-50" elevation={3}>
      <Box className="mb-15">
        {imageSrc && (
          <Box style={{ position: "relative", width: "100%", height: "450px" }} className="p-2">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 5}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onCropChange={setCrop}
            />
            <Box
              sx={{
                mt: 2,
                position: "absolute",
                bottom: -60,
                left: 0,
                right: 0,
              }}
              className="mt-20"
            >
              <Typography variant="caption">Zoom</Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(_, value) => setZoom(value as number)}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box className="text-right">
        <Button
          variant="contained"
          color="success"
          onClick={() => onSubmit()}
          className="mt-4 font-bold w-38"
        >
          CROP
        </Button>
      </Box>
    </Paper>
  );
}
