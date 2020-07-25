function CServerCallback(name, exportName)
    TriggerEvent('citadel:registerServerCalback', GetCurrentResourceName(), name, exportName)
end

function TestLuaCallback(source, cb, arg1)
    print('lua recv source', source)
    cb('Its doen!')
end

exports('TestLuaCallback', TestLuaCallback)

CServerCallback("TestCallback", "TestLuaCallback")

print('^2Lua loaded^0')