import { Button, Center, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import Summary from "./summary";
import Expense from "./expense-view";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../context";

export default function Main() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    totalExpense,
    setTotalExpense,
    totalIncome,
    setTotalIncome,
    allTransaction,
  } = useContext(GlobalContext);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    allTransaction.forEach((item) => {
      item.type === "income"
        ? (income = income + parseFloat(item.amount))
        : (expense = expense + parseFloat(item.amount));
    });

    setTotalExpense(expense);
    setTotalIncome(income);
  }, [allTransaction]);

  return (
    <Flex textAlign={"Center"} flexDirection={"column"} pr={"5"} pl={"5"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} mt={12}>
        <Heading
          color={"blue.400"}
          display={["none", "block", "block", "block", "block"]}
        >
          Expense Tracker
        </Heading>
        <Flex alignItems={"center"}>
          <Button onClick={onOpen} bg={"blue.400"} color={"black"} ml={"4"}>
            Add New Transaction
          </Button>
        </Flex>
      </Flex>
      <Summary
        totalExpense={totalExpense}
        totalIncome={totalIncome}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex
        w={"full"}
        alignItems={"flex-start"}
        justifyContent={"space-evenly"}
        flexDirection={("column", "column", "column", "row", "row")}
      >
        <Expense
          data={allTransaction.filter((item) => item.type === "expense")}
          type={"expense"}
        />
        <Expense
          data={allTransaction.filter((item) => item.type === "income")}
          type={"income"}
        />
      </Flex>
    </Flex>
  );
}
