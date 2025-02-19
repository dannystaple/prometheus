import {
  Popover,
  ActionIcon,
  Fieldset,
  Checkbox,
  Stack,
  Group,
  NumberInput,
} from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { FC } from "react";
import { useAppDispatch } from "../state/hooks";
import { updateSettings, useSettings } from "../state/settingsSlice";
import { actionIconStyle } from "../styles";

const SettingsMenu: FC = () => {
  const {
    useLocalTime,
    enableQueryHistory,
    enableAutocomplete,
    enableSyntaxHighlighting,
    enableLinter,
    showAnnotations,
    ruleGroupsPerPage,
    alertGroupsPerPage,
  } = useSettings();
  const dispatch = useAppDispatch();

  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <ActionIcon
          color="gray"
          title="Settings"
          aria-label="Settings"
          size={32}
        >
          <IconSettings style={actionIconStyle} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Group align="flex-start">
          <Stack>
            <Fieldset p="md" legend="Global settings">
              <Checkbox
                checked={useLocalTime}
                label="Use local time"
                onChange={(event) =>
                  dispatch(
                    updateSettings({
                      useLocalTime: event.currentTarget.checked,
                    })
                  )
                }
              />
            </Fieldset>

            <Fieldset p="md" legend="Query page settings">
              <Stack>
                <Checkbox
                  checked={enableQueryHistory}
                  label="Enable query history"
                  onChange={(event) =>
                    dispatch(
                      updateSettings({
                        enableQueryHistory: event.currentTarget.checked,
                      })
                    )
                  }
                />
                <Checkbox
                  checked={enableAutocomplete}
                  label="Enable autocomplete"
                  onChange={(event) =>
                    dispatch(
                      updateSettings({
                        enableAutocomplete: event.currentTarget.checked,
                      })
                    )
                  }
                />
                <Checkbox
                  checked={enableSyntaxHighlighting}
                  label="Enable syntax highlighting"
                  onChange={(event) =>
                    dispatch(
                      updateSettings({
                        enableSyntaxHighlighting: event.currentTarget.checked,
                      })
                    )
                  }
                />
                <Checkbox
                  checked={enableLinter}
                  label="Enable linter"
                  onChange={(event) =>
                    dispatch(
                      updateSettings({
                        enableLinter: event.currentTarget.checked,
                      })
                    )
                  }
                />
              </Stack>
            </Fieldset>
          </Stack>

          <Stack>
            <Fieldset p="md" legend="Alerts page settings">
              <Checkbox
                checked={showAnnotations}
                label="Show expanded annotations"
                onChange={(event) =>
                  dispatch(
                    updateSettings({
                      showAnnotations: event.currentTarget.checked,
                    })
                  )
                }
              />
            </Fieldset>
            <Fieldset p="md" legend="Alerts page settings">
              <NumberInput
                min={1}
                allowDecimal={false}
                label="Alert groups per page"
                value={alertGroupsPerPage}
                onChange={(value) => {
                  if (typeof value !== "number") {
                    return;
                  }

                  dispatch(
                    updateSettings({
                      alertGroupsPerPage: value,
                    })
                  );
                }}
              />
            </Fieldset>
            <Fieldset p="md" legend="Rules page settings">
              <NumberInput
                min={1}
                allowDecimal={false}
                label="Rule groups per page"
                value={ruleGroupsPerPage}
                onChange={(value) => {
                  if (typeof value !== "number") {
                    return;
                  }

                  dispatch(
                    updateSettings({
                      ruleGroupsPerPage: value,
                    })
                  );
                }}
              />
            </Fieldset>
          </Stack>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SettingsMenu;
