import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../decks/CreateDeck";
import ViewDeck from "../decks/ViewDeck";
import StudyDeck from "../decks/study/StudyDeck";
import EditDeck from "../decks/EditDeck";
import AddCard from "../decks/cards/AddCard";
import EditCard from "../decks/cards/EditCard";
import Home from "../home/Home";

function Layout() {
  return (
    <>
      <Header />
      <table align="center" className="table-borderless" width={600}>
        <tbody>
          <tr>
            <td>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path={`/decks/:deckId/study`}>
                  <StudyDeck />
                </Route>
                <Route exact path={`/decks/new`}>
                  <CreateDeck />
                </Route>
                <Route exact path={`/decks/:deckId`}>
                  <ViewDeck />
                </Route>
                <Route exact path={`/decks/:deckId/edit`}>
                  <EditDeck />
                </Route>
                <Route exact path={`/decks/:deckId/cards/new`}>
                  <AddCard />
                </Route>
                <Route exact path={`/decks/:deckId/cards/:cardId/edit`}>
                  <EditCard />
                </Route>
                <Route path="/">
                  <NotFound />
                </Route>
              </Switch>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Layout;
