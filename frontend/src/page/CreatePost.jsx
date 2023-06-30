import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import preview from '../assets/preview.png';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    image: '',
  });

  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);


  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await fetch('http://localhost:8080/api/v1/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };
  const handleSubmit = () => {
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">Create</h1>
        <p className="text-gray-700 mt-2 text-lg">Create Creative Images</p>
      </div>
      <form className="mt-8 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <FormField
            label="Your Name"
            name="name"
            value={form.name}
            placeholder="Muhammed Hasan"
            handleChange={handleChange}
          />
          <FormField
            label="Prompt"
            name="prompt"
            value={form.prompt}
            placeholder="A plush toy robot sitting against a yellow wall"
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64 text-gray-900 p-3 h-64 text-sm flex justify-center items-center">
            {form.image ? (
              <img src={form.image} alt={form.prompt} className="w-full h-full object-cover object-center" />
            ) : (
              <img src={preview} alt="preview" className="w-full h-full object-cover object-center opacity-50" />
            )}
            {generatingImage && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center rounded-lg bg-gray-900 bg-opacity-50">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {generatingImage ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10">
          <p className="text-gray-600 mt-2 text-sm">
            Once you have generated your image, you can share it with others in the community.
          </p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
