import { useState } from "react";
import { Camera, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileUploadProps {
  currentImage?: string;
  userName: string;
  onImageChange: (imageData: string) => void;
}

const ProfileUpload = ({ currentImage, userName, onImageChange }: ProfileUploadProps) => {
  const [preview, setPreview] = useState(currentImage || "");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="h-32 w-32 border-4 border-accent/20 transition-all group-hover:border-accent/40">
          <AvatarImage src={preview} alt={userName} />
          <AvatarFallback className="text-3xl bg-accent/10 text-accent">
            {userName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="h-8 w-8 text-white" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="profile-upload" className="cursor-pointer">
          <Button type="button" variant="outline" size="sm" asChild>
            <span>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </span>
          </Button>
        </Label>
        <Input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileUpload;
