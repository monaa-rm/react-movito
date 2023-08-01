import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import DefaultImage from "../../assets/images/user.png";
import Spinner from "../../utils/Spinner";
import { Helmet } from "react-helmet-async";

const PersonDetails = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [profile, setProfile] = useState();
  const { actorId } = useParams();
  const [biography, setBiography] = useState();
  const [place, setPlace] = useState();
  const [birth, setBirth] = useState();
  const [death, setDeath] = useState();
  const [gender, setGender] = useState();
  const [acting, setActing] = useState([]);
  const [knownAs, setKnownAs] = useState([]);
  const [knownFor, setKnownFor] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPersonDetails = async () => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}?api_key=b1223b4f8f85cc05490eb9417c4450a4`
      );
      if (request.status === 200) {
        setName(request.data.name || request.data.title);
        setBiography(request.data.biography);
        setBirth(request.data.birthday);
        setDeath(request.data.deathday);
        setGender(request.data.gender);
        setPlace(request.data.place_of_birth);
        setProfile(request.data.profile_path);
        setKnownAs(request.data.also_known_as);
        setKnownFor(request.data.known_for_department);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPersonActing = async () => {
    try {
      const request = await axios.get(
        `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=b1223b4f8f85cc05490eb9417c4450a4 `
      );
      if (request.status === 200) {
        let acts = request.data.cast.map((act) => {
          let itemDate = act.release_date || act.first_air_date || "-";
          const year = itemDate.slice(0, 4);

          return {
            id: act.id,
            name: act.name || act.title || act.original_name,
            img: act.backdrop_path || act.poster_path,
            character: act.character,
            date: year,
          };
        });
        acts =
          acts.length > 1 && acts.sort((a, b) => b.date.localeCompare(a.date));
        setActing(acts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = () => {
    fetchPersonDetails();
    fetchPersonActing();
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
    return () => fetchData();
  }, []);

  const base_url = "https://image.tmdb.org/t/p/original/";
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="bg-neutral-900 min-h-screen">
        <Helmet>
          <title>{`MOVITO -` + name}</title>
        </Helmet>
        <Navbar />
        <div className="grid grid-cols-1 sm:grid-cols-3 pt-16">
          <div className="py-5 sm:col-span-1">
            <img
              className="mx-auto w-52 h-52 sm:w-10/12 sm:h-auto bg-slate-200 rounded-md "
              src={profile ? `${base_url}${profile}` : DefaultImage}
              alt="not upload"
              onError={(e) => {
                e.target.src = { DefaultImage };
              }}
            />
            <div className="px-6">
              <h1 className="text-white text-3xl font-bold py-5 text-center sm:hidden">
                {name}
              </h1>
              <h3 className="text-white font-bold text-lg pt-3">
                Personal Info
              </h3>
              {knownFor != [] && (
                <>
                  <h4 className="text-white pt-2">Known For</h4>
                  <p className="font-thin text-slate-300 pb-2">{knownFor}</p>
                </>
              )}
              {gender && (
                <>
                  <h4 className="text-white pt-2">Gender</h4>
                  <p className="font-thin text-slate-300 pb-2">
                    {gender === 1 ? "Female" : "Male"}
                  </p>
                </>
              )}
              {birth && (
                <>
                  <h4 className="text-white pt-2">Birthday</h4>
                  <p className="font-thin text-slate-300 pb-2">{birth}</p>
                </>
              )}
              {death && (
                <>
                  <h4 className="text-white pt-2">Death</h4>
                  <p className="font-thin text-slate-300 pb-2">{death}</p>
                </>
              )}
              {place && (
                <>
                  <h4 className="text-white pt-2">Place of Birth</h4>
                  <p className="font-thin text-slate-300 pb-2">{place}</p>
                </>
              )}
              {knownAs && knownAs != "" && (
                <>
                  <h4 className="text-white pt-2">Also Known As</h4>
                  {knownAs?.map((item, index) => (
                    <p className="font-thin text-slate-300 pb-2" key={index}>
                      {item}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* //////////////////// */}
          <div className="sm:col-span-2">
            <h1 className="text-white text-3xl font-bold py-5  pl-6 hidden sm:block">
              {name}
            </h1>
            <div className="px-6">
              <h4 className="text-white text-lg pb-2 pt-6 sm:pt-4">
                Biography
              </h4>
              {biography ? (
                <>
                  <p className="font-thin text-slate-300 pb-2 text-justify">
                    {biography}
                  </p>
                </>
              ) : (
                <p className="font-thin text-slate-300 pb-2 text-justify">
                  We don't have a biography for {name}.
                </p>
              )}
              <div className="pb-16">
                <h4 className="text-white text-lg  pt-6 shadow-sm sm:pt-4 pb-2">
                  Acting
                </h4>
                <div className=" border border-x-slate-400 ">
                  {" "}
                  {acting?.map((item, index) => (
                    <div
                      key={index}
                      className={`text-white flex items-center px-5 py-2 ${
                        index > 0 && item?.date !== acting[index - 1].date
                          ? "border-b border-slate-300"
                          : ""
                      }`}
                    >
                      <span className="font-thin pr-5 w-10 text-center">
                        {item.date}
                      </span>

                      <div className="pl-6">
                        <h1
                          className="cursor-pointer font-medium "
                          onClick={() => navigate(`/movie/${item.id}`)}
                        >
                          {item.name}
                        </h1>
                        <h4 className="font-thin text-slate-200">
                          {" "}
                          {item.character != "" && (
                            <span className="text-slate-400 pr-1 pl-2">as</span>
                          )}
                          {item.character}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PersonDetails;
