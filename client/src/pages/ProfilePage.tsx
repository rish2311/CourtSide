import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Camera, MapPin, Save } from "lucide-react";

import { getCurrentUser, updateProfile } from "../services/auth";
import useAuthStore from "../store/authStore";
import { SkillLevel, type User } from "../types/user";
import { Avatar, AvatarFallback, AvatarImage } from "../../@/components/ui/avatar";
import { Button } from "../../@/components/ui/button";
import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";

const SPORT_OPTIONS = [
  "Cricket", "Football", "Basketball", "Tennis",
  "Badminton", "Squash", "Volleyball", "Pickleball",
];

const profileSchema = z.object({
  firstName: z.string().min(2).max(50).trim().optional().or(z.literal("")),
  lastName: z.string().min(2).max(50).trim().optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  preferredLocation: z.string().trim().optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, token, setUser, setLoading, loading } = useAuthStore();
  const [sports, setSports] = useState<string[]>([]);
  const [skillLevel, setSkillLevelState] = useState<SkillLevel | "">("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (!token) { navigate("/login"); return; }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await getCurrentUser();
        const u = response.data;
        setUser(u);
        populateForm(u);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    const populateForm = (u: User) => {
      reset({
        firstName: u.firstName,
        lastName: u.lastName,
        phone: u.phone || "",
        preferredLocation: u.preferredLocation || "",
      });
      setSports(u.sportsInterests || []);
      setSkillLevelState(u.skillLevel || "");
    };

    if (!user) fetchUser();
    else populateForm(user);
  }, []);

  const toggleSport = (sport: string) => {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const response = await updateProfile({
        ...data,
        sportsInterests: sports,
        skillLevel: skillLevel || undefined,
      });
      setUser(response.data);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "??";

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-5">
            <div className="relative group">
              <Avatar className="h-20 w-20 ring-2 ring-primary/10">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-xl font-semibold bg-primary/5">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-on-surface">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-sm text-on-surface-variant">@{user?.username}</p>
              <p className="text-xs text-on-surface-variant/60 mt-0.5">
                {user?.email} {user?.isVerified ? "• Verified" : "• Not verified"}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" {...register("phone")} />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.email || ""} disabled />
                <p className="text-xs text-on-surface-variant">Email cannot be changed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sports & Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <Label>Sports Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {SPORT_OPTIONS.map((sport) => {
                    const selected = sports.includes(sport);
                    return (
                      <button
                        key={sport}
                        type="button"
                        onClick={() => toggleSport(sport)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                          selected
                            ? "bg-primary text-on-primary border-primary"
                            : "bg-surface border-outline-variant/30 text-on-surface-variant hover:border-primary/50"
                        }`}
                      >
                        {sport}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <select
                  id="skillLevel"
                  value={skillLevel}
                  onChange={(e) => setSkillLevelState(e.target.value as SkillLevel)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                >
                  <option value="">Select skill level</option>
                  {Object.values(SkillLevel).map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0) + level.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredLocation" className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Preferred Location
                </Label>
                <Input
                  id="preferredLocation"
                  placeholder="e.g. Mumbai, India"
                  {...register("preferredLocation")}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Save className="w-4 h-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
