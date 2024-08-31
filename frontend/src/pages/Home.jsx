import { React, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../components/Arrows";

const HomePage = ({ category }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const [recipes, setRecipes] = useState([]);
  const [expandedRecipes, setExpandedRecipes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const query = category ? `?category=${category}` : "";
        const response = await fetch(
          `http://localhost:3000/retrieve/retrieve${query}`
        );
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [category]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const toggleDescription = (recipeId) => {
    setExpandedRecipes((prevExpandedRecipes) => ({
      ...prevExpandedRecipes,
      [recipeId]: !prevExpandedRecipes[recipeId],
    }));
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-[100vh] w-full bg-cover"
        style={{ backgroundImage: "url('/home.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl lg:text-6xl font-bold">
            Welcome to RecipeShare
          </h1>
        </div>
      </div>

      {/* Recent Recipes Section */}
      <section className="container mx-auto py-12 px-4 bg-green-50">
        <h2 className="text-3xl font-bold mb-6">
          {category ? `${category} Recipes` : "All Recipes"}
        </h2>
        <Slider {...settings}>
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="p-2"
              
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                <img
                  src={`http://localhost:3000/${recipe.image}`}
                  alt={recipe.title}
                  onClick={() => handleRecipeClick(recipe._id)}
                  className="w-full h-48 object-cover"
                />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{recipe.title}</h3>
                    <p
                      className={`text-gray-600 mt-2 ${
                        expandedRecipes[recipe._id] ? "" : "line-clamp-2"
                      }`}
                    >
                      {recipe.description}
                    </p>
                    <button
                      onClick={() => toggleDescription(recipe._id)}
                      className="flex  justify-center self-start px-2 py-2 mt-4 font-bold tracking-wide text-black bg-white rounded-xl max-md:px-5"
                    >
                      {expandedRecipes[recipe._id] ? "See Less" : "See More"}
                    </button>
                  </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Vegetarian Recipes Section */}
      <section className="container mx-auto py-12 px-4 bg-green-50">
        <h2 className="text-3xl font-bold mb-6">Vegetarian Recipes</h2>
        <Slider {...settings}>
          {recipes
            .filter((recipe) => recipe.category === "Vegetarian")
            .map((recipe) => (
                <div key={recipe._id} className="p-2">
                <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={`http://localhost:3000/${recipe.image}`}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                    onClick={() => handleRecipeClick(recipe._id)}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{recipe.title}</h3>
                    <p
                      className={`text-gray-600 mt-2 ${
                        expandedRecipes[recipe._id] ? "" : "line-clamp-2"
                      }`}
                    >
                      {recipe.description}
                    </p>
                    <button
                      onClick={() => toggleDescription(recipe._id)}
                      className="flex gap-4 justify-center self-start px-10 py-4 mt-4 font-bold tracking-wide text-black bg-white rounded-xl max-md:px-5"
                    >
                      {expandedRecipes[recipe._id] ? "See Less" : "See More"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </section>


      {/* Non-Vegetarian Recipes Section */}
      <section className="container mx-auto py-12 px-4 bg-green-50">
        <h2 className="text-3xl font-bold mb-6">Non-Vegetarian Recipes</h2>
        <Slider {...settings}>
          {recipes
            .filter((recipe) => recipe.category === "Non-Vegetarian")
            .map((recipe) => (
                <div key={recipe._id} className="p-2">
                <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={`http://localhost:3000/${recipe.image}`}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                    onClick={() => handleRecipeClick(recipe._id)}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{recipe.title}</h3>
                    <p
                      className={`text-gray-600 mt-2 ${
                        expandedRecipes[recipe._id] ? "" : "line-clamp-2"
                      }`}
                    >
                      {recipe.description}
                    </p>
                    <button
                      onClick={() => toggleDescription(recipe._id)}
                      className="flex gap-4 justify-center self-start px-10 py-4 mt-4 font-bold tracking-wide text-black bg-white rounded-xl max-md:px-5"
                    >
                      {expandedRecipes[recipe._id] ? "See Less" : "See More"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </section>

      {/* Seasonal Recipes Section */}
      <section className="container mx-auto py-12 px-4 bg-green-50">
        <h2 className="text-3xl font-bold mb-6">Seasonal Recipes</h2>
        <Slider {...settings}>
          {recipes
            .filter((recipe) => recipe.category === "Seasonal")
            .map((recipe) => (
                <div key={recipe._id} className="p-2">
                <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={`http://localhost:3000/${recipe.image}`}
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                    onClick={() => handleRecipeClick(recipe._id)}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{recipe.title}</h3>
                    <p
                      className={`text-gray-600 mt-2 ${
                        expandedRecipes[recipe._id] ? "" : "line-clamp-2"
                      }`}
                    >
                      {recipe.description}
                    </p>
                    <button
                      onClick={() => toggleDescription(recipe._id)}
                      className="flex gap-4 justify-center self-start px-10 py-4 mt-4 font-bold tracking-wide text-black bg-white rounded-xl max-md:px-5"
                    >
                      {expandedRecipes[recipe._id] ? "See Less" : "See More"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </section>

      <footer className="mt-12">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
