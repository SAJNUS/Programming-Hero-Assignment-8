"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "../../../components/page-header";
import { useSession, updateUser } from "../../../lib/auth-client";
import ProtectedRoute from "../../../components/protected-route";

function UpdateProfileContent() {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [previewImage, setPreviewImage] = useState(user?.image || "");

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setImage(user.image || "");
            setPreviewImage(user.image || "");
        }
    }, [user]);

    async function handleUpdateProfile(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Name is required");
            return;
        }

        setIsLoading(true);

        try {
            const result = await updateUser({
                name: name.trim(),
                image: image.trim() || undefined,
            });

            if (result) {
                setSuccess("Profile updated successfully!");
                setTimeout(() => {
                    router.push("/profile");
                }, 1500);
            }
        } catch (err) {
            console.error("Update error:", err);
            setError(
                err.message || "Failed to update profile. Please try again.",
            );
        } finally {
            setIsLoading(false);
        }
    }

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImage(url);
        setPreviewImage(url);
    };

    const userInitials = user?.name
        ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .substring(0, 2)
        : user?.email?.split("@")[0]?.substring(0, 2)?.toUpperCase() || "SC";

    return (
        <div className="space-y-8">
            <PageHeader
                eyebrow="Account"
                title="Update Profile"
                description="Edit your profile information and picture."
            />

            <article className="mx-auto max-w-2xl rounded-[2rem] border border-base-300/70 bg-base-100 p-6 shadow-sm sm:p-8">
                {/* Success Toast */}
                {success && (
                    <div className="mb-6 rounded-2xl border border-success/30 bg-success/10 p-4 text-success">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">✓</span>
                            <p className="font-semibold">{success}</p>
                        </div>
                    </div>
                )}

                {/* Error Toast */}
                {error && (
                    <div className="mb-6 rounded-2xl border border-error/30 bg-error/10 p-4 text-error">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">✕</span>
                            <p className="font-semibold">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                    {/* Photo Preview */}
                    <div>
                        <label className="block text-sm font-semibold text-neutral mb-3">
                            Profile Photo Preview
                        </label>
                        <div className="rounded-2xl border border-base-300/70 p-4 bg-base-100">
                            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                                {previewImage ? (
                                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl ring-4 ring-primary/20 flex-shrink-0">
                                        <Image
                                            src={previewImage}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                            unoptimized
                                            onError={() => setPreviewImage("")}
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-2xl font-black text-white ring-4 ring-primary/20 flex-shrink-0">
                                        {userInitials}
                                    </div>
                                )}
                                <div className="text-sm text-base-content/70">
                                    {previewImage ? (
                                        <p>Current image will be updated</p>
                                    ) : (
                                        <p>No image provided</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Photo URL Input */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-semibold text-neutral mb-2"
                        >
                            Photo URL
                        </label>
                        <input
                            id="image"
                            type="url"
                            value={image}
                            onChange={handleImageUrlChange}
                            placeholder="https://example.com/photo.jpg"
                            className="input input-bordered rounded-2xl w-full text-base placeholder:text-base-content/40"
                        />
                        <p className="mt-2 text-xs text-base-content/60">
                            Enter a valid image URL. Leave empty to use your
                            initials.
                        </p>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-neutral mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="input input-bordered rounded-2xl w-full text-base placeholder:text-base-content/40"
                            required
                        />
                        <p className="mt-2 text-xs text-base-content/60">
                            This is how your name will appear on your profile.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary rounded-full px-8 shadow-soft disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    Updating...
                                </>
                            ) : (
                                "Update Profile"
                            )}
                        </button>
                        <Link
                            href="/profile"
                            className="btn btn-outline rounded-full px-8 flex-1 sm:flex-none text-center"
                        >
                            Cancel
                        </Link>
                    </div>

                    {/* Info Box */}
                    <div className="rounded-2xl bg-info/10 border border-info/30 p-4 text-info text-sm">
                        <p className="font-semibold mb-2">💡 Tips:</p>
                        <ul className="space-y-1 list-disc list-inside">
                            <li>
                                Use direct image URLs (e.g., from Unsplash,
                                Imgur)
                            </li>
                            <li>Avoid truncated or shortened URLs</li>
                            <li>HTTPS URLs are recommended</li>
                        </ul>
                    </div>
                </form>
            </article>
        </div>
    );
}

export default function UpdateProfilePage() {
    return (
        <ProtectedRoute>
            <UpdateProfileContent />
        </ProtectedRoute>
    );
}
