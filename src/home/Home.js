import React from "react";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import DeckList from "./DeckList";

export const Home = () => {
  const history = useHistory();

  const breadcrumbItems = [{ path: "/", name: "Home" }];

  return (
    <table className="table-light">
      <tbody>
        <tr>
          <td>
            <Breadcrumb breadcrumbItems={breadcrumbItems} />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => history.push("/decks/new")}
            >
              Create Deck
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <DeckList />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Home;
