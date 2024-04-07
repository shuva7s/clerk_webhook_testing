"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

//get dataBaseId based on the Clerk id
export async function findUserIdAndUsernameByClerkId(clerkId: string | undefined) {
    if (!clerkId) {
        console.log("Received undefined clerkId");
        return null; // or throw an error if appropriate
    }

    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId }).select('_id username');

        if (!user) {
            console.log("User not found");
            return null;
        }
        const userIdString = user._id.toString();

        return { userId: userIdString, username: user.username };
    } catch (error) {
        handleError(error);
        return null;
    }
}


// CREATE
export async function createUser(user: CreateUserParams) {
    try {
        await connectToDatabase();

        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

// READ
export async function getUserById(userId: string | undefined) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: userId });

        if (!user) throw new Error("User not found");

        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

export async function getAuthorInfoNameById(clerkId: string) {
    try {
        await connectToDatabase();

        const user = await User.findOne({ clerkId: clerkId });

        if (!user) {
            console.error("User not found");
            return { authorName: "", authorImage: "" };
        }

        return { authorName: user.username, authorImage: user.photo };
    } catch (error) {
        handleError(error);
        return { authorName: "", authorImage: "" };
    }
}


// UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
    try {
        await connectToDatabase();

        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
            new: true,
        });

        if (!updatedUser) throw new Error("User update failed");

        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

// DELETE
export async function deleteUser(clerkId: string) {
    try {
        await connectToDatabase();

        // Find user to delete
        const userToDelete = await User.findOne({ clerkId });

        if (!userToDelete) {
            throw new Error("User not found");
        }

        // Delete user
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath("/");

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}
