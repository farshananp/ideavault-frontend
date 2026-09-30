import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const IDEA_URL = 'https://ideavault-api-6s2i.onrender.com/ideas';

// GET - Fetch all ideas
export const fetchIdeas = createAsyncThunk(
    'ideas/fetchIdeas',
    async () => {
        const result = await axios.get(IDEA_URL);
        return result.data;
    }
);

// POST - Add new idea
export const addIdea = createAsyncThunk(
    'ideas/addIdea',
    async (newIdea) => {
        const result = await axios.post(IDEA_URL, newIdea);
        return result.data;
    }
);

// PUT - Update idea
export const updateIdea = createAsyncThunk(
    'ideas/updateIdea',
    async (updatedIdea) => {
        const result = await axios.put(
            `${IDEA_URL}/${updatedIdea.id}`,
            updatedIdea
        );

        return result.data;
    }
);

// DELETE - Delete idea
export const deleteIdea = createAsyncThunk(
    'ideas/deleteIdea',
    async (id) => {
        await axios.delete(`${IDEA_URL}/${id}`);
        return id;
    }
);

const ideaSlice = createSlice({
    name: 'ideas',

    initialState: {
        ideas: [],
        loading: false,
        error: ''
    },

    reducers: {},

    extraReducers: (builder) => {

        // FETCH
        builder.addCase(fetchIdeas.pending, (state) => {
            state.loading = true;
            state.error = '';
        });

        builder.addCase(fetchIdeas.fulfilled, (state, action) => {
            state.loading = false;
            state.ideas = action.payload;
        });

        builder.addCase(fetchIdeas.rejected, (state) => {
            state.loading = false;
            state.error = 'Failed to fetch ideas';
        });

        // ADD
        builder.addCase(addIdea.fulfilled, (state, action) => {
            state.ideas.push(action.payload);
        });

        // UPDATE
        builder.addCase(updateIdea.fulfilled, (state, action) => {

            const index = state.ideas.findIndex(
                idea =>
                    String(idea.id) ===
                    String(action.payload.id)
            );

            if (index !== -1) {
                state.ideas[index] = action.payload;
            }
        });

        // DELETE
        builder.addCase(deleteIdea.fulfilled, (state, action) => {

            state.ideas = state.ideas.filter(
                idea =>
                    String(idea.id) !==
                    String(action.payload)
            );
        });
    }
});

export default ideaSlice.reducer;